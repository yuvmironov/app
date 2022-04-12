<template>
  <header class="Header">
    <img class="Header-Logo" src="@/Assets/images/BigLogo_I.svg"/>
    <UserMenu/>
  </header>
</template>

<script>
import UserMenu from '@/Components/UserMenu'
export default {
  name: 'inner-header',
  components: { UserMenu }
}
</script>
