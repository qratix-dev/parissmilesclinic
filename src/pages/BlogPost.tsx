import type { ReactElement } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { blogPosts, type BlogPost as BlogPostType } from '../data/blog'
import { blogTranslations } from '../data/blogTranslations'
import { useLanguage } from '../contexts/LanguageContext'

function parseBody(body: string) {
  const lines = body.split('\n')
  const elements: ReactElement[] = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) { key++; continue }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="font-serif text-2xl font-bold text-[var(--navy)] mt-10 mb-4">
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="font-serif text-xl font-bold text-[var(--navy)] mt-8 mb-3">
          {line.replace('### ', '')}
        </h3>
      )
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={key++} className="font-sans font-bold text-[var(--navy)] mt-4 mb-2">
          {line.replace(/\*\*/g, '')}
        </p>
      )
    } else if (line.startsWith('- ')) {
      const listItems: string[] = [line.replace('- ', '')]
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('- ')) {
        i++
        listItems.push(lines[i].trim().replace('- ', ''))
      }
      elements.push(
        <ul key={key++} className="font-sans text-[var(--text)] leading-relaxed mb-4 ml-6 list-disc space-y-1">
          {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      )
    } else if (line.startsWith('|') && line.endsWith('|')) {
      // Table
      const tableLines: string[] = [line]
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('|')) {
        i++
        tableLines.push(lines[i].trim())
      }
      const rows = tableLines.filter((l) => !l.match(/^\|[\s\-|]+\|$/))
      elements.push(
        <div key={key++} className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm font-sans">
            <tbody>
              {rows.map((row, rIdx) => {
                const cells = row.split('|').filter(Boolean).map((c) => c.trim())
                return (
                  <tr key={rIdx} className={rIdx === 0 ? 'bg-[var(--navy)] text-white' : 'border-b border-[var(--border)] hover:bg-[var(--bg)]'}>
                    {cells.map((cell, cIdx) => (
                      rIdx === 0
                        ? <th key={cIdx} className="px-4 py-3 text-left font-sans font-bold text-xs uppercase tracking-wider">{cell}</th>
                        : <td key={cIdx} className="px-4 py-3 text-[var(--text)]">{cell}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    } else {
      elements.push(
        <p key={key++} className="font-sans text-[var(--text)] leading-relaxed mb-4">
          {line}
        </p>
      )
    }
  }

  return elements
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [headings, setHeadings] = useState<string[]>([])
  const { t, lang } = useLanguage()

  // Merge base post with language-specific translation override
  const displayPost = post
    ? (() => {
        if (lang === 'en') return post
        const override = blogTranslations[lang]?.[post.slug]
        if (!override) return post
        return { ...post, title: override.title, excerpt: override.excerpt, body: override.body }
      })()
    : null

  useEffect(() => {
    const found = blogPosts.find((p) => p.slug === slug) ?? null
    setPost(found)
    window.scrollTo(0, 0)
  }, [slug])

  // Re-derive headings whenever the display language or post changes
  useEffect(() => {
    if (!displayPost) return
    const h2s = displayPost.body
      .split('\n')
      .filter((l) => l.trim().startsWith('## '))
      .map((l) => l.trim().replace('## ', ''))
    setHeadings(h2s)
  }, [displayPost])

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
          <div className="text-center">
            <h1 className="font-serif text-3xl text-[var(--navy)] mb-4">Article not found</h1>
            <Link to="/blog" className="font-sans text-[var(--gold)] hover:underline">{t.blog.backBtn}</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg)]">
        {/* Cover hero */}
        <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
          <img src={post.coverImage} alt={displayPost!.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[var(--navy)]/70" />
          <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-6 pb-10 w-full">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--gold)] text-[var(--navy)] font-sans font-bold text-xs mb-3">
              {post.category}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white max-w-3xl leading-snug">
              {displayPost!.title}
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-sans text-[var(--muted)]">
            <Link to="/" className="hover:text-[var(--gold)] transition-colors duration-150">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[var(--gold)] transition-colors duration-150">Blog</Link>
            <span>/</span>
            <span className="text-[var(--navy)] line-clamp-1">{displayPost!.title}</span>
          </div>
        </div>

        {/* Article layout */}
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="flex gap-12 lg:gap-16 items-start">
            {/* Main article */}
            <article className="flex-1 min-w-0">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--navy)] flex items-center justify-center text-xs font-bold text-[var(--gold)]">
                    {post.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <span className="font-sans font-semibold text-sm text-[var(--navy)]">{post.author}</span>
                </div>
                <span className="font-sans text-sm text-[var(--muted)]">{post.date}</span>
                <span className="font-sans text-sm text-[var(--muted)]">{post.readingTime}</span>
              </div>

              {/* Body */}
              <div className="prose-content max-w-none">
                {parseBody(displayPost!.body)}
              </div>

              {/* Inline CTA banner */}
              <div
                className="mt-12 rounded-2xl p-8 text-center"
                style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #1a2744 100%)', boxShadow: 'var(--shadow-card)' }}
              >
                <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[var(--gold)] mb-3">Free Consultation</p>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">Ready to transform your smile?</h3>
                <p className="font-sans text-white/60 text-sm leading-relaxed mb-6 max-w-md mx-auto">
                  Book a free consultation with our specialists in Antalya. Get a personalised treatment plan and quote within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/442034889319"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--gold)] text-[var(--navy)] font-sans font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-opacity duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                    Book via WhatsApp
                  </a>
                  <Link
                    to="/#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-sans font-semibold text-sm hover:border-[var(--gold)] hover:text-[var(--gold)] active:scale-[0.98] transition-colors duration-200"
                  >
                    Send a Message
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-28">
              {/* Table of contents */}
              {headings.length > 0 && (
                <div
                  className="bg-white rounded-xl p-6 mb-6"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-[var(--muted)] mb-4">
                    Contents
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {headings.map((h, i) => (
                      <li key={i} className="font-sans text-sm text-[var(--navy)] hover:text-[var(--gold)] transition-colors duration-150 cursor-pointer leading-snug">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA card */}
              <div
                className="bg-[var(--navy)] rounded-xl p-6 text-center"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <p className="text-xs font-sans font-bold uppercase tracking-widest text-[var(--gold)] mb-2">Free Consultation</p>
                <h3 className="font-serif text-lg font-bold text-white mb-3">Ready to transform your smile?</h3>
                <p className="font-sans text-white/60 text-xs mb-5 leading-relaxed">
                  Book a free consultation with our specialists in Antalya.
                </p>
                <a
                  href="https://wa.me/442034889319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-3 rounded-md bg-[var(--gold)] text-[var(--navy)] font-sans font-bold text-sm hover:bg-[var(--gold-light)] transition-colors duration-200 active:scale-[0.98]"
                >
                  Book via WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="pb-16 lg:pb-24">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="font-serif text-2xl font-bold text-[var(--navy)] mb-8">{t.blog.relatedTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/blog/${rp.slug}`}
                    className="bg-white rounded-xl overflow-hidden group"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div className="relative overflow-hidden aspect-[16/9]">
                      <img
                        src={rp.coverImage}
                        alt={rp.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-sans font-bold text-xs mb-2">
                        {rp.category}
                      </span>
                      <h3 className="font-serif font-bold text-sm text-[var(--navy)] line-clamp-2 leading-snug">
                        {rp.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
