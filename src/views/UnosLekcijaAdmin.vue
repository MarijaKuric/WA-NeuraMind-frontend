<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-lg rounded-lg shadow-lg p-8">

      <h2 class="text-2xl font-bold text-blue-400 mb-6">
        {{ isEdit ? 'Izmena lekcije' : 'Unos nove lekcije' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Naslov</label>
          <input
            v-model="lesson.title"
            type="text"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Sadržaj</label>
          <textarea
            v-model="lesson.content"
            rows="6"
            class="w-full border rounded px-3 py-2"
            required
          ></textarea>
        </div>

        <div class="flex justify-between mt-6">
          <button class="bg-blue-400 text-white px-4 py-2 rounded">
            Sačuvaj
          </button>

          <button
            type="button"
            @click="router.push('/admin')"
            class="bg-gray-300 px-4 py-2 rounded"
          >
            Odustani
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const lesson = ref({
  title: '',
  content: ''
})

const isEdit = computed(() => !!route.query.id)

onMounted(async () => {
  if (isEdit.value) {
    const { data } = await api.get(`/lessons/${route.query.id}`)
    lesson.value = data
  }
})

const handleSubmit = async () => {
  if (isEdit.value) {
    await api.put(`/lessons/${route.query.id}`, lesson.value)
  } else {
    await api.post('/lessons', lesson.value)
  }
  router.push('/pregled-lekcija')
}
</script>
<style scoped>  </style>