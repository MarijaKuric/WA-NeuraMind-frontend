<template>
  <div class="min-h-screen bg-gray-100 p-4 flex justify-center">
    <div class="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">

      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-blue-400">Pregled kvizova</h2>

        <button
          @click="router.push('/admin')"
          class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          ⬅ Dashboard
        </button>
      </div>

      <div v-if="quizzes.length === 0" class="text-gray-500 text-center">
        Nema kvizova
      </div>

      <div class="space-y-4">
        <div
          v-for="quiz in quizzes"
          :key="quiz._id"
          class="border rounded p-4 flex justify-between items-start"
        >
          <div>
            <h3 class="font-semibold text-gray-800">{{ quiz.question }}</h3>
            <ul class="text-sm text-gray-600 list-disc ml-5">
              <li
                v-for="(opt, i) in quiz.options"
                :key="i"
              >
                {{ opt }}
                <span
                  v-if="i + 1 === quiz.correct"
                  class="text-green-600 font-bold"
                >
                  (tačno)
                </span>
              </li>
            </ul>
          </div>

          <div class="flex gap-2">
            <button
              @click="editQuiz(quiz._id)"
              class="bg-yellow-400 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              @click="deleteQuiz(quiz._id)"
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
const quizzes = ref([])

const fetchQuizzes = async () => {
  const { data } = await api.get('/quizzes')
  quizzes.value = data
}

const editQuiz = (id) => {
  router.push({ path: '/unos-kvizova', query: { id } })
}

const deleteQuiz = async (id) => {
  if (!confirm('Obrisati kviz?')) return

  await api.delete(`/quizzes/${id}`)
  quizzes.value = quizzes.value.filter(q => q._id !== id)
}

onMounted(fetchQuizzes)
</script>
<style scoped></style>