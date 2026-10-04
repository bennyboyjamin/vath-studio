import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiStar, FiMic, FiDownload, FiZap } from 'react-icons/fi'

function HomePage() {
  const { t } = useTranslation()

  const features = [
    { icon: <FiZap className="text-2xl" />, title: 'Fast Generation', desc: 'Create songs in seconds' },
    { icon: <FiMic className="text-2xl" />, title: 'Voice Cloning', desc: 'Use your own voice' },
    { icon: <FiDownload className="text-2xl" />, title: 'Easy Download', desc: 'High quality MP3' },
    { icon: <FiStar className="text-2xl" />, title: 'Unlimited Remix', desc: 'Edit and remix songs' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-transparent bg-clip-text gradient-primary">
            {t('home.title')}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
          {t('home.subtitle')}
        </p>
        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          {t('home.description')}
        </p>
        <Link
          to="/generate"
          className="inline-block btn-primary text-lg px-8 py-4 hover:shadow-lg hover:shadow-primary/50 transition-all"
        >
          {t('home.cta_button')}
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">{t('home.features')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="card text-center">
              <div className="text-primary mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center gradient-dark rounded-2xl">
        <h2 className="text-4xl font-bold mb-6">Ready to Create?</h2>
        <p className="text-gray-400 mb-8">Join thousands of creators making music with AI</p>
        <Link to="/generate" className="inline-block btn-secondary text-lg px-8 py-4">
          Get Started Now
        </Link>
      </section>
    </div>
  )
}

export default HomePage
