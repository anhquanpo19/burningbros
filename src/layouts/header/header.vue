<template>
  <div class="layout-header">
    <div class="header-left">
      Header Left
    </div>
    <div class="header-right">
      Header Right
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px;
  font-size: 20px;

  & .header-left {
    display: flex;
    align-items: center;
    flex-grow: 1;

    & .group-tabs {
      width: 500px;
      margin-left: 22px;
      margin-right: 22px;
      flex-grow: 1;
    }
  }

  & .header-right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    flex-grow: 0;

    & .header-avatar {
      display: flex;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;

      & .header-avatar-name {
        margin-left: 6px;
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }
}
</style>
<style lang="scss">
.layout-header {
  & .header-left {
    & .ant-tabs-bar {
      margin: 0;
      border: none;
    }
  }
}
</style>
