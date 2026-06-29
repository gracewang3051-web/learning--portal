# 学习门户 · Grace

个人学习辅助网站 — 一站式入口，整合多个学习应用。

## 当前应用

| 应用 | URL | 状态 |
|---|---|---|
| 📚 文言文辅导 | https://wenyan-web.onrender.com | 已上线 |
| 📅 暑假日程表 | https://paike-kayi.onrender.com | 已上线（永久） |
| 🎓 华老师课程导读 | — | 准备中 |

## 本地开发

```bash
cd ~/Desktop/学习门户
python3 -m http.server 8000
# 打开 http://127.0.0.1:8000
```

## 更新门户

```bash
cd ~/Desktop/学习门户
# 改 index.html / style.css
git add .
git commit -m "..."
git push
# Render 自动 redeploy (~2 min)
```

## 部署

Render Static Site，GitHub repo: `gracewang3051-web/learning-portal`
<!-- auto-deploy test 19:09:07 -->
