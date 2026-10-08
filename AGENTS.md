# jugelizi

jugelizi A knowledge-sharing app — "chestnut" tips (little nuggets of wisdom) across categories like programming, design, lifestyle, learning, and trivia. Tech Stack - Expo SDK 56 - React Native 0.85.3 - React 19.2.3 - React Navigation v7 (bottom-tabs + native-stack)

## 用途与 Target 判定

内容/生活方式应用（已归档）

- 移动端：需要
- 智能硬件：可选（可搁置）

## 目标平台

| 平台 | 方式 | 产出 |
|------|------|------|
| 移动端 | 按原工程栈 | APK / IPA |
| 智能硬件 | 可选 | — |

## 技术栈信号

- 检测到：node

## 命令

```bash
npm install
npm test
npm run start
```

## 状态

已归档。默认只做必要修复与知识库同步，不新开大范围需求。

## 助手约束

- Loop：先定可验证 Done 与停止条件；每切片过验证环；失败回灌；详见 docs/LOOP_ENGINEERING.md
- Harness：遵循根 AGENTS「Harness Engineering」；Guide=本文件，Sensor=测试/CI；同类失误二次须沉淀规则或测试（棘轮）。详见 docs/HARNESS_ENGINEERING.md
- 遵循仓库根 `/Users/skat/AGENTS.md` 与本文件的用途判定
- 可选 Target 可搁置；不适用形态不要硬加
- 改动聚焦；公共逻辑抽离复用
