<template>
  <div class="min-h-screen bg-gray-100 flex justify-center p-4">
    <div class="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8 flex flex-col min-h-[80vh]">

      <!-- LOGO -->
      <div class="flex justify-center mb-8">
        <h1 class="text-4xl font-bold italic text-blue-400">NEURAMind</h1>
      </div>

      <!-- NAVIGACIJA -->
      <div class="flex justify-center gap-3 mb-10 flex-wrap">
        <button @click="goToLessons" :class="inactiveBtn">LEKCIJE</button>
        <button @click="goToKvizovi" :class="inactiveBtn">KVIZOVI</button>
        <button @click="goToStatistika" :class="inactiveBtn">STATISTIKA</button>
        <button class="bg-blue-500 text-white px-5 py-2 rounded-full font-bold">ZAJEDNICA</button>
        <button @click="goToAIChat" :class="inactiveBtn">AI CHAT</button>
      </div>

      <!-- NOVA OBJAVA -->
      <div class="mb-8">
        <textarea
          v-model="newPost"
          placeholder="Postavi pitanje ili podijeli razmišljanje..."
          class="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <button
          @click="createPost"
          class="mt-3 bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-bold hover:scale-105 transition"
        >
          Objavi
        </button>
      </div>

      <!-- OBJAVE -->
      <div class="space-y-6 overflow-y-auto">

        <div
          v-for="post in posts"
          :key="post.id"
          class="bg-linear-to-br from-gray-50 to-blue-50 p-5 rounded-xl shadow hover:shadow-lg transition"
        >
          <div class="flex justify-between mb-2">
            <div>
              <h4 class="font-bold text-blue-600">{{ post.ime }}</h4>
              <p class="text-xs text-gray-500">{{ post.role }}</p>
            </div>
            <span class="text-sm text-gray-500">
              {{ post.date }}
            </span>
          </div>

          <p class="mb-4 text-gray-700">{{ post.text }}</p>

          <div class="flex gap-6 items-center">
            <button
              @click="likePost(post.id)"
              class="text-pink-500 font-bold hover:scale-110 transition"
            >
              ❤️ {{ post.likes }}
            </button>

            <span class="text-gray-400 text-sm">
              💬 {{ post.comments }} komentara
            </span>
          </div>
        </div>

      </div>

      <div class="mt-auto flex justify-center pt-6">
        <button @click="logout" class="text-blue-900 font-bold hover:underline">
          ODJAVA
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const newPost = ref('')

const posts = ref([
  {
    id: 1,
    ime: 'Ana K.',
    role: 'Učenik',
    text: 'Može li mi netko objasniti razliku između machine learninga i deep learninga?',
    likes: 5,
    comments: 2,
    date: '11.2.2026.'
  },
  {
    id: 2,
    ime: 'Marko P.',
    role: 'Učenik',
    text: 'Zna li netko zašto je važno imati kvalitetne podatke u AI sustavima?',
    likes: 8,
    comments: 4,
    date: '10.2.2026.'
  },
  
])

const createPost = () => {
  if (!newPost.value) return

  posts.value.unshift({
    id: Date.now(),
    ime: 'Ti',
    role: 'Učenik',
    text: newPost.value,
    likes: 0,
    comments: 0,
    date: new Date().toLocaleDateString()
  })

  newPost.value = ''
}

const likePost = (id) => {
  const post = posts.value.find(p => p.id === id)
  if (post) post.likes++
}

const inactiveBtn =
  'bg-pink-400 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-400 transition'

const goToLessons = () => router.push({ name: 'PrikazLekcija' })
const goToKvizovi = () => router.push({ name: 'KvizoviKorisnik' })
const goToStatistika = () => router.push({ name: 'StatistikaKorisnik' })
const goToAIChat = () => router.push({ name: 'AIChat' })
const logout = () => router.push('/')
</script>

<style scoped>
textarea {
  min-height: 100px;
}
</style>
