import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <div className="page-top flex min-h-[70svh] items-center">
      <div className="editorial-grid w-full">
        <div className="col-span-12 md:col-span-8">
          <p className="label-mono text-[11px] text-accent">404</p>
          <h1 className="headline-section mt-6">Page not found / Страница не найдена</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            The page you requested does not exist or has been moved.
            <br />
            Запрошенная страница не существует или была перемещена.
          </p>
          <div className="mt-10 flex flex-wrap gap-6 label-mono text-[11px]">
            <Link href="/en" className="text-ink hover:text-accent">
              ← EN Home
            </Link>
            <Link href="/ru" className="text-ink hover:text-accent">
              ← RU Главная
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
