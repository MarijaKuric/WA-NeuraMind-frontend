<template>
  <div class="min-h-screen bg-gray-100 p-4 flex justify-center">
    <div class="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">

      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-blue-400">Pregled lekcija</h2>

        <button
          @click="router.push('/admin')"
          class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          ⬅ Dashboard
        </button>
      </div>

      <div v-if="lessons.length === 0" class="text-gray-500 text-center">
        Nema lekcija
      </div>

      <div class="space-y-4">
        <div
          v-for="lesson in lessons"
          :key="lesson._id"
          class="border rounded p-4 flex justify-between items-start"
        >
          <div>
            <h3 class="font-semibold text-gray-800">{{ lesson.title }}</h3>
            <p class="text-gray-600 text-sm">{{ lesson.content }}</p>
          </div>

          <div class="flex gap-2">
            <button
              @click="editLesson(lesson._id)"
              class="bg-yellow-400 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              @click="deleteLesson(lesson._id)"
              class="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const lessons = ref([])

const fetchLessons = async () => {
  const { data } = await api.get('/lessons')
  lessons.value = data
}

const editLesson = (id) => {
  router.push({ path: '/unos-lekcija', query: { id } })
}

const deleteLesson = async (id) => {
  if (!confirm('Obrisati lekciju?')) return

  await api.delete(`/lessons/${id}`)
  lessons.value = lessons.value.filter(l => l._id !== id)
}

onMounted(fetchLessons)
</script>
<style scoped></style>