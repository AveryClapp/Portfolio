import Link from "next/link";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import SemanticSearch from "@/Components/Knowledge/SemanticSearch";
import DirectoryTracker from "@/Components/NavigationTrail/TrailClearer";

function formatDate(dateString) {
  if (!dateString) return '';
  if (dateString.match(/^\d{2}-\d{2}-\d{4}$/)) return dateString;
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = dateString.split('-');
    return `${month}-${day}-${year}`;
  }
  return dateString;
}

export default function DirectoryPage({ directory, mocs }) {
  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <DirectoryTracker directoryTitle={directory.title} directorySlug={directory.slug} />
      <Header className="mb-6" />
      <main className="mb-6 relative z-20 flex-1">
        <div className="px-4 lg:ml-32">
          <div className="w-full lg:w-[55%]">
            {/* Breadcrumb */}
            <div className="mb-4 text-xs text-neutral-500">
              <Link href="/wiki" className="hover:text-neutral-900 transition-colors">
                Wiki
              </Link>
              <span className="mx-2">›</span>
              <span className="text-neutral-900">{directory.title}</span>
            </div>

            {/* Directory Header */}
            <div className="mb-8">
              {directory.icon && (
                <div className="text-3xl mb-2">{directory.icon}</div>
              )}
              <h1 className="mb-3 text-2xl font-display font-bold text-neutral-900 tracking-tight">
                {directory.title}
              </h1>
              {directory.description && (
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {directory.description}
                </p>
              )}
            </div>

            {/* Semantic Search - scoped to this directory */}
            {/* <SemanticSearch directory={directory.slug} /> */}

            {/* Tier 1 MOCs */}
            {mocs.length > 0 ? (
              <div className="space-y-8">
                {mocs.map((moc, index) => (
                  <article
                    key={moc.slug}
                    className={index < mocs.length - 1 ? 'border-b border-neutral-200 pb-6' : 'pb-6'}
                  >
                    <h2 className="text-lg font-display font-semibold mb-2">
                      <Link
                        href={`/wiki/${moc.slug}`}
                        className="hover:text-neutral-600 transition-colors"
                      >
                        {moc.title}
                      </Link>
                    </h2>
                    <p className="text-xs text-neutral-500 mb-2">
                      {formatDate(moc.date)}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-8">
                No tier 1 collections in this directory yet.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
