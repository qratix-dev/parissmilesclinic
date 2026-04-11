import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { blogPosts } from '../data/blog'
import { blogTranslations } from '../data/blogTranslations'
import { useLanguage } from '../contexts/LanguageContext'

// Maps the English category string stored in blogPosts to translation key
const CATEGORY_KEY_MAP: Record<string, 'all' | 'implants' | 'cosmetic' | 'whitening' | 'oral'> = {
  'All': 'all',
  'Dental Implants': 'implants',
  'Cosmetic Dentistry': 'cosmetic',
  'Teeth Whitening': 'whitening',
  'Oral Health': 'oral',
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(6)
  const { t, lang } = useLanguage()

  const categoryLabels = t.blog.categories

  // Ordered list of English category keys (filter logic uses English keys internally)
  const categoryKeys = ['All', 'Dental Implants', 'Cosmetic Dentistry', 'Teeth Whitening', 'Oral Health']

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory)

  const visible = filtered.slice(0, visibleCount)

  // Get translated title/excerpt for a post
  const getDisplayPost = (post: typeof blogPosts[0]) => {
    if (lang === 'en') return post
    const override = blogTranslations[lang]?.[post.slug]
    if (!override) return post
    return { ...post, title: override.title, excerpt: override.excerpt }
  }

  // Get translated label for a category key
  const getCategoryLabel = (key: string) => {
    const tKey = CATEGORY_KEY_MAP[key]
    return tKey ? categoryLabels[tKey] : key
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[var(--navy)] pt-32 pb-20 text-center">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[var(--gold)] mb-4">
              {t.blog.label}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white">
              {t.blog.title} <em className="italic text-[var(--gold)]">{t.blog.titleGold}</em>
            </h1>
            <p className="font-sans text-white/60 mt-4 max-w-xl mx-auto text-base">
              {t.blog.subtitle}
            </p>
          </div>
        </section>

        {/* Filter tabs */}
        <section className="bg-white border-b border-[var(--border)] sticky top-16 lg:top-20 z-30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {categoryKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => { setActiveCategory(key); setVisibleCount(6) }}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-sans font-semibold text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--gold)] ${
                    activeCategory === key
                      ? 'bg-[var(--gold)] text-[var(--navy)]'
                      : 'text-[var(--muted)] hover:text-[var(--navy)]'
                  }`}
                >
                  {getCategoryLabel(key)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog grid */}
        <section className="py-16 lg:py-20 bg-[var(--bg)]">
          <div className="max-w-7xl mx-auto px-6">
            {visible.length === 0 ? (
              <p className="text-center font-sans text-[var(--muted)] py-20">No articles in this category yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visible.map((post) => {
                  const dp = getDisplayPost(post)
                  return (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl overflow-hidden group"
                      style={{ boxShadow: 'var(--shadow-card)', transition: 'box-shadow 0.25s' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-hover)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)' }}
                    >
                      {/* Cover */}
                      <div className="relative overflow-hidden aspect-[16/9]">
                        <img
                          src={post.coverImage}
                          alt={dp.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-3 py-1 rounded-full bg-[var(--gold)] text-[var(--navy)] font-sans font-bold text-xs">
                            {getCategoryLabel(post.category)}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3 text-xs font-sans text-[var(--muted)]">
                          <span>{post.author}</span>
                          <span>·</span>
                          <span>{post.date}</span>
                        </div>
                        <h2 className="font-serif font-bold text-lg text-[var(--navy)] mb-2 leading-snug line-clamp-2">
                          {dp.title}
                        </h2>
                        <p className="font-sans text-sm text-[var(--muted)] leading-relaxed line-clamp-2 mb-5">
                          {dp.excerpt}
                        </p>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 font-sans font-semibold text-sm text-[var(--gold)] hover:text-[var(--navy)] transition-colors duration-200"
                        >
                          {t.blog.readMore}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}

            {/* Load more */}
            {visibleCount < filtered.length && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount((n) => n + 6)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md border-2 border-[var(--gold)] text-[var(--gold)] font-sans font-semibold text-sm hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--gold)] active:scale-[0.98]"
                >
                  {t.blog.loadMore}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
