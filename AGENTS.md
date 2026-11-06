<!-- intent-skills:start -->
## Skill Loading

Use the repository’s installed Intent. If it is unavailable, report the missing dependency instead of downloading a replacement.
Before editing files for a substantial task:
- Run `npx -y @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `npx -y @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

## Feature 文件夹规范

以 `src/features/auth` 为参考模板，新增 feature 时沿用同样的拆分方式。

### 文件夹结构

```
src/features/<feature>/
├── schema.ts     # Zod schema 与推导类型
├── server/       # 纯服务端数据函数
├── orpc/         # oRPC procedure，base.ts 放中间件与 builder
├── component/    # feature 内组件
└── page/         # 路由级页面
```

文件夹名用单数；文件名用 kebab-case。

### 文件夹功能

- `schema.ts`：集中放校验规则，同时导出 schema 与 `z.infer` 类型；数据库相关 feature 用 `drizzle-zod` 生成，并省略 `id`/`createdAt`/`updatedAt`。其他层不内联写 schema。
- `server/`：每个操作一个文件，导出普通 `async` 函数。只做数据读写，不引用 `@orpc/server`，不抛 `ORPCError`，查不到返回 `null`/`undefined`；需要关联数据时用 `db.query.*` + `with`。
- `orpc/`：每个 procedure 一个文件，只做 `.input(schema)` 校验、调用 `server/` 函数、整理返回结构。业务性错误在这里抛 `ORPCError`。`index.ts` 用 `os.router({})` 汇总并挂到 `src/orpc/router/index.ts`。
- `component/`：feature 内 UI，通过 oRPC 客户端取数，禁止引用 `server/` 或 `#/db`。
- `page/`：路由级页面外壳，只组合 `component/`，由 `src/routes/` 引用。

依赖方向单向：`page -> component -> orpc -> server -> #/db`，不可反向。

### 表单规则

- 表单统一用 `useAppForm`（`#/hooks/form`）+ `FieldGroup`/`Field` 组合，字段组件用项目内置的 `InputField`/`TextareaField`/`SelectField`/`CheckboxGroupField`/`RadioGroupField`/`SwitchField`，提交用 `SubmitButton`。
- 校验只允许写在字段级：`form.AppField` 的 `validators.onChange` / `validators.onBlur`。
- **禁止表单级校验**：任何情况下都不允许使用 `formOptions`/`useAppForm` 顶层的 `validators`（`onChange`/`onBlur`/`onSubmit`/`onDynamic` 等）、`validationLogic`（如 `revalidateLogic`）或 `FieldGroup` 级校验。
- 字段校验规则与 `schema.ts` 保持语义一致，但不要在组件里内联复用整表 schema，按字段逐条声明。

### 命名规则

| 类型 | 规则 | 示例 |
| --- | --- | --- |
| 文件名 | kebab-case | `create-admin-user.ts` |
| 组件 | PascalCase，组件文件名带 `-component`/`-page` | `LoginPage`、`CreateAdminUserFormComponent` |
| server 函数 | camelCase + `Server` 后缀 | `createAdminUserServer`、`getTravelAskByIdServer` |
| oRPC procedure | camelCase + `ORPC` 后缀 | `createAdminUserORPC` |
| schema 与类型 | camelCase + `Schema`/`Input` 后缀 | `createAdminUserSchema`、`CreateAdminUserInput` |
| 表导入 | 与变量名冲突时加 `Table` 别名 | `user as userTable` |
| 路径别名 | 统一用 `#/*` | `#/db`、`#/features/auth/schema` |

## lib 工具函数

`src/lib/` 放与业务无关的通用工具，不允许引用 `#/features/*`，也不允许被 `#/db` 反向依赖。新增通用能力时优先复用下表已有函数，不要重复实现。

| 文件 | 导出 | 用途 |
| --- | --- | --- |
| `utils.ts` | `cn(...inputs)` | 合并 className，转发 `cn` 包，配合 Tailwind 处理条件类名 |
| `random.ts` | `randomNumber({ minNumber, maxNumber })` | 返回 `[min, max]` 闭区间内的随机整数；入参顺序无关，内部自动取最小/最大值 |
| `chinese.ts` | `toTraditional(text)` | 简体中文转台湾正体中文；基于 `opencc-js` 的词级转换，转换器在模块顶层初始化一次 |
| `highlighter.tsx` | `loadHighlighter(language)` / `highlightCode(code, language)` | 基于 shiki 的代码高亮。前者返回 `{ highlight(code, state) }`，支持流式续接（传回上一次的 `state`）；后者一次性返回 `React.ReactNode[]`（每行一个节点）。语言不在白名单内时均返回 `null` |
| `auth.ts` | `auth` | 服务端 Better Auth 实例，含 `emailAndPassword`、`admin()`、`tanstackStartCookies()` 插件与 drizzle adapter |
| `auth-client.ts` | `authClient` | 客户端 Better Auth 客户端，含 `adminClient()` 插件 |

补充约定：

- 新增 lib 文件用 kebab-case 命名，纯函数优先，副作用（如词典加载、highlighter 实例）收敛到模块顶层并做惰性缓存。
- 仅在服务端使用的工具（如依赖 `#/db`、密钥、大体积词典）不要被 `component/`、`page/` 引用。
- `chinese.ts` 的 `toTraditional` 仅做 `cn -> tw`；需要反向或香港字形时在 lib 内新增导出，不要在业务层直接调用 `opencc-js`。