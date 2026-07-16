import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm" role="list">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ color: '#7a6555' }}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-orange-600 font-medium"
                style={{ color: '#7a6555' }}
              >
                {item.label}
              </Link>
            ) : (
              <span
                style={{ color: '#3d2b1f' }}
                aria-current="page"
                className="font-medium"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
