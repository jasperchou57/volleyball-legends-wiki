# 游戏更新入口

用户说“检查游戏更新”或要求检查已配置游戏公告并同步网站时，按 `automation/README.md` 的当前会话流程完整执行。

当前 Codex 自己理解公告；不要求 OPENAI_API_KEY，不要求用户复制公告或截图。先运行 `automation/session.mjs check`，读其 prompt/schema/batch，输出结构化事实，accept → publish → next，处理全部批次及发布重试，报告真实线上结果。使用 Node 24；PATH 没有 Node 时使用本目录 `.local-node`。

只操作采集器及已关联的两个站。保留来源校验、去重、失败重试、独立发布 checkout 和现有冻结字段。不开启定时器，不上传 ChatGPT 登录凭据。详细边界与真实生产入口以 README 为准。

转发频道没有公告不等于官方没有更新。必须看 sourceCoverage；官方源尚未核实时，用已登录浏览器继续核对，否则报告核对未完成，不能报告“没有新官方公告”。
