# Crayon 博客个人信息清理

站点：https://blog.qynexai.cn
GitHub：https://github.com/Crayon-hua

- 更新站点标题、简介、SEO 域名、RSS 兜底、头像和导航标识。
- 移除原作者的邮箱、社交入口、友链、打赏收款配置、GitHub 赞助入口和广告推广链接。
- 清空评论仓库 ID、个人媒体账号和歌单 ID；未配置的第三方功能保持关闭。
- 关于我和友链页面改为 Crayon 的资料。
- 已确认的上游示例文章、动态、项目通过内容加载器排除，原始文件保留在源码中，Redis 文章保留发布。未来新文章不受这些明确的文件排除项影响。
- 原作者收款二维码与示例相册资源仅从 dist 构建产物剔除，public 源文件保留备查；以后配置自己的打赏资源请使用新的文件名并更新 sponsorConfig。
- 保留 LICENSE、主题来源、Footer / RSS / Atom 的主题归属，以及原有作者版权注释。通用框架文档和公共 API 不按个人信息删除。

配置入口：src/config/；文章元数据必须包含 title 和 published。请勿在源码中存放真实服务密钥。
