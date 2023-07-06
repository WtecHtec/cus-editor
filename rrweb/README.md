#### 监听页面dom状态
当页面是已加载、载入完成状态，触发(Meta)快照, 随后判断页面是否存在Dom节点, 触发(FullSnapshot)快照 。
```
// 状态判断
document.readyState === "interactive" || document.readyState === "complete"

// 触发(Meta)快照
wrapEvent({
  type: EventType.Meta,
  data: {
    href: window.location.href,
    width: **,
    height:**
  }
})

// 触发(FullSnapshot)快照
wrapEvent({
  type: EventType.FullSnapshot,
  data: {
    node,
    initialOffset: {
      left: **,
      top: **
    }
  }
})

```

### MutationObserver 

开启 MutationObserver 监听 dom节点变化：

```
subtree boolean 元素下的所有子节点的添加删除、属性变化等
attributes boolean 属性变化
attributeFilter array 需要筛选的属性值数组
attributeOldValue boolean 属性变化的旧值
childList boolean 子孙节点的添加或删除
characterData boolean 节点中值的变化监听
characterDataOldValue boolean 节点中值的变化监听

```

### addEventListener
addEventListener 监听按钮点击、滚动、鼠标滑动等事件
```
addEventListener
```

