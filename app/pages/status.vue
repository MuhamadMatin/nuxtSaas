<script setup lang="ts">
useSeoMeta({
  title: "System Status",
  description: "Current uptime and status of our services.",
})

const services = [
  { name: "API", status: "operational" },
  { name: "AI Generation", status: "operational" },
  { name: "Dashboard", status: "operational" },
  { name: "Billing", status: "operational" },
]

const statusColor: Record<string, "success" | "warning" | "error"> = {
  operational: "success",
  degraded: "warning",
  down: "error",
}

const statusLabel: Record<string, string> = {
  operational: "Operational",
  degraded: "Degraded performance",
  down: "Down",
}
</script>

<template>
  <UContainer class="py-16 sm:py-24">
    <div class="max-w-xl mx-auto">
      <div class="text-center mb-10">
        <h1 class="text-3xl sm:text-4xl font-bold tracking-tight">System Status</h1>
        <p class="mt-3 text-(--ui-text-dimmed)">All systems are currently operational.</p>
      </div>

      <UCard>
        <ul class="divide-y divide-(--ui-border)">
          <li v-for="service in services" :key="service.name" class="flex items-center justify-between py-3">
            <span class="text-sm font-medium">{{ service.name }}</span>
            <UBadge :color="statusColor[service.status]" variant="subtle">
              {{ statusLabel[service.status] }}
            </UBadge>
          </li>
        </ul>
      </UCard>
    </div>
  </UContainer>
</template>