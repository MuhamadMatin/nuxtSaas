<template>
  <div>
    <aside class="fixed top-0 left-0 transition-all duration-300 hidden sm:block w-72">
      <!-- logo -->
      <div class="flex flex-col border-r border-gray-300 dark:border-gray-800 min-h-screen">
        <div class="h-16 px-5 flex items-center">
          <Logo />
        </div>
      </div>
    </aside>
    <div class="flex flex-col ml-0 sm-ml-7 overflow-hidden duration-300 transition-all h-screen p-2">
      <!-- navbar -->
      <Navbar>
        <slot />
      </Navbar>
    </div>
  </div>
</template>