---
title: "git"
sidebarDepth: 2
---

## 配置

```
git config --global user.name 你的英文名
git config --global user.email 你的邮箱
git config --global push.default simple
git config --global core.quotepath false
git config --global core.editor "code--wait"
git config --global core.autoctlf input
```

- .gitignore 记录哪些变动是不需要提交的

## 查看代码

```
git status
git status -sb  查看哪个冲突
git commit -m
git commit -v 打开编辑器，输入本次提交代码的相关信息
git log 查看提交历史
git reset --hard xxxxxx 回到指定版本
git reflog  查看提交历史和版本切换历史
git branch
git branch -d 删除分支
git checkout
git show 查看修改的内容
git merge
git push origin button:button
git remote -v 查看关联的远程仓库
```

## 如何解决代码冲突

```
git status -sb 查看冲突内容
======   修改冲突
git add 文件名 标记文件
git commit  提交
```

## 如何上传其他分支

1. `git push origin x:x`
2. ```
   git checkout x
   git push -u origin x
   ```

## 克隆

```
git clone git@?/xxx.git yyy 克隆并重命名
git clone git@?/xxx.git . 克隆并使用当前目录存放（空目录）
```

## 上传到两个远程仓库

```
git remote add repo2 git@xxxxxx
git push -u repo2 master
```

## 美化历史命令

```
git rebase -i xxxx(提交号)
参数：r，reword 采用，但改写message
参数：s，squash 采用，但改写message
git rebase --abort 取消rebase
git rebase --continue 继续
```

## 临时隐藏代码

```
git stash 隐藏
git stash pop 出现
```
