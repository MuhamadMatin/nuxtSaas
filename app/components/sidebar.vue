<template>
  <div class="flex">
    <aside class="fixed top-0 left-0 hidden sm:block w-72">
      <div class="flex flex-col border-r border-gray-300 dark:border-gray-800 min-h-screen">
        <!-- logo -->
        <div class="h-16 px-5 flex items-center">
          <Logo />
        </div>
      </div>
    </aside>
    <main class="ml-0 sm:ml-72 flex-1 min-h-screen">
      <!-- navbar -->
      <Navbar>
        <slot />
      </Navbar>
    </main>
  </div>
</template>