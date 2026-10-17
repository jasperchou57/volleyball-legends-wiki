"""One-time setup. Reads existing local .env and Git credentials without displaying secrets.

Install PyNaCl into .tools/python first. Run from the collector directory.
The schedule stays disabled unless --enable is supplied and every required key exists.
"""
import base64
import json
import os
from pathlib import Path
import subprocess
import sys
import urllib.request
import urllib.error

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / '.tools/python'))
from nacl.public import PublicKey, SealedBox

values = {}
for line in (ROOT / '.env').read_text().splitlines():
    if line.strip() and not line.lstrip().startswith('#') and '=' in line:
        key, value = line.split('=', 1)
        values[key.strip()] = value.strip().strip('"').strip("'")
result = subprocess.run(['git', 'credential', 'fill'], input='protocol=https\nhost=github.com\n\n',
                        text=True, capture_output=True, env={**os.environ, 'GIT_TERMINAL_PROMPT': '0'})
credential = dict(line.split('=', 1) for line in result.stdout.splitlines() if '=' in line)
if not credential.get('password'):
    raise SystemExit('GitHub credential unavailable; configure repository secrets through GitHub Settings.')
BASE = 'https://api.github.com/repos/jasperchou57/volleyball-legends-wiki/'
def api(path, method='GET', body=None):
    request = urllib.request.Request(BASE + path, method=method,
        data=json.dumps(body).encode() if body is not None else None,
        headers={'Authorization': 'Bearer ' + credential['password'], 'Accept': 'application/vnd.github+json', 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            content = response.read()
            return json.loads(content) if content else None
    except urllib.error.HTTPError as error:
        raise SystemExit(f'GitHub setup failed: HTTP {error.code} at {path}') from None

public = api('actions/secrets/public-key')
box = SealedBox(PublicKey(base64.b64decode(public['key'])))
required = ['DISCORD_BOT_TOKEN', 'OPENAI_API_KEY', 'BRIXUMI_UPDATE_TOKEN', 'VERCEL_TOKEN']
for name in required:
    if values.get(name):
        encrypted = base64.b64encode(box.encrypt(values[name].encode())).decode()
        api('actions/secrets/' + name, 'PUT', {'encrypted_value': encrypted, 'key_id': public['key_id']})
        print(name + ': configured')
    else:
        print(name + ': missing locally')
existing = {item['name'] for item in api('actions/secrets')['secrets']}
variables = {item['name']: item['value'] for item in api('actions/variables')['variables']}
enable = '--enable' in sys.argv
missing = set(required) - existing
if enable and missing:
    raise SystemExit('Cannot enable; missing: ' + ', '.join(sorted(missing)))
for name, value in {'VERCEL_PROJECT_ID': 'volleyball-legends-wiki', 'VERCEL_TEAM_SLUG': 'jasperchous-projects-84a4d356',
                    'OFFICIAL_CODES_ENABLED': 'true' if enable else variables.get('OFFICIAL_CODES_ENABLED', 'false')}.items():
    api('actions/variables' + ('/' + name if name in variables else ''), 'PATCH' if name in variables else 'POST', {'name': name, 'value': value})
print('Schedule enabled: ' + str(enable or variables.get('OFFICIAL_CODES_ENABLED') == 'true'))
