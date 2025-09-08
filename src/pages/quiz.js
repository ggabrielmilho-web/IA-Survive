import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Brain, AlertTriangle } from 'lucide-react'
import { quizQuestions } from '../data/questions'
import { calculateISIa } from '../lib/quiz-logic'

export default function Quiz() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setProgress(((currentQuestion + 1) / quizQuestions.length) * 100)
  }, [currentQuestion])

  const handleAnswer = (questionKey, answerIndex, answerValue) => {
    setAnswers(prev => ({
      ...prev,
      [questionKey]: answerIndex
    }))
  }

  const nextQuestion = () => {
    if (isAnimating) return
    
    const currentQuestionData = quizQuestions[currentQuestion]
    const currentAnswer = answers[currentQuestionData.key]
    
    if (currentAnswer === undefined) {
      alert('Por favor, selecione uma resposta antes de continuar.')
      return
    }

    setIsAnimating(true)
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        // Quiz completo, calcular resultado e redirecionar
        finishQuiz()
      }
      setIsAnimating(false)
    }, 300)
  }

  const previousQuestion = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setTimeout(() => {
      if (currentQuestion > 0) {
        setCurrentQuestion(prev => prev - 1)
      }
      setIsAnimating(false)
    }, 300)
  }

  const finishQuiz = () => {
    // Calcular ISIa com as respostas
    const result = calculateISIa(answers)
    
    // Salvar resultado no localStorage para a página de resultado
    const quizResult = {
      answers,
      ...result,
      completedAt: new Date().toISOString()
    }
    
    localStorage.setItem('quizResult', JSON.stringify(quizResult))
    
    // Redirecionar para página de resultado
    router.push('/result')
  }

  const question = quizQuestions[currentQuestion]
  const currentAnswer = answers[question?.key]

  return (
    <>
      <Head>
        <title>Quiz ISIa® - IA Survivor</title>
        <meta name="description" content="Descubra seu risco de substituição pela IA respondendo 5 perguntas estratégicas" />
      </Head>

      <div className="min-h-screen bg-gradient-apocalypse flex flex-col">
        {/* Header com Progress */}
        <div className="p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => currentQuestion > 0 ? previousQuestion() : router.push('/')}
                className="p-2 text-primary-gray hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gradient">ISIa® QUIZ</h1>
                <p className="text-primary-gray text-sm">
                  {currentQuestion + 1} de {quizQuestions.length}
                </p>
              </div>
              
              <div className="w-8"></div> {/* Spacer */}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-secondary-gray-dark rounded-full h-2 mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="bg-primary-red h-2 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-2xl mx-auto w-full">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: isAnimating ? 50 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Question Icon */}
              <div className="mb-8 flex justify-center">
                <div className="w-16 h-16 bg-primary-red/20 rounded-full flex items-center justify-center">
                  {currentQuestion < 2 ? (
                    <Brain className="w-8 h-8 text-primary-red" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-secondary-yellow" />
                  )}
                </div>
              </div>

              {/* Question Text */}
              <h2 className="text-2xl md:text-3xl font-bold mb-12 text-white leading-relaxed">
                {question?.question}
              </h2>

              {/* Answer Options */}
              <div className="space-y-3 mb-12">
                {question?.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(question.key, index, option)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      currentAnswer === index
                        ? 'border-primary-red bg-primary-red/10 text-white'
                        : 'border-primary-gray/30 bg-secondary-gray-dark/50 text-primary-gray hover:border-primary-red/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        currentAnswer === index
                          ? 'border-primary-red bg-primary-red'
                          : 'border-primary-gray'
                      }`}>
                        {currentAnswer === index && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg border-2 transition-all ${
                currentQuestion === 0
                  ? 'border-primary-gray/30 text-primary-gray cursor-not-allowed'
                  : 'border-primary-gray text-primary-gray hover:border-white hover:text-white'
              }`}
            >
              Anterior
            </button>

            <button
              onClick={nextQuestion}
              disabled={currentAnswer === undefined}
              className={`px-8 py-3 rounded-lg transition-all inline-flex items-center gap-2 ${
                currentAnswer !== undefined
                  ? 'bg-primary-red hover:bg-secondary-red-dark text-white font-semibold'
                  : 'bg-primary-gray/30 text-primary-gray cursor-not-allowed'
              }`}
            >
              {currentQuestion === quizQuestions.length - 1 ? (
                <>
                  <Brain className="w-5 h-5" />
                  Ver Meu ISIa®
                </>
              ) : (
                <>
                  Próxima
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}