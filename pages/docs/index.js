const section = [
  "Introduction",
  "Installation",
  "Codeblocks",
  "Annotations",
  "<CH.Code>",
  "<CH.Section>",
  "<CH.Scrollycoding>",
  "<CH.Spotlight>",
  "<CH.Slideshow>",
  "Roadmap",
  "Changelog",
  "Troubleshooting",
];

export default function Page() {
  return (
    <div>
      <div className="sticky top-0">
        <nav className="bg-blue-400 max-w-7xl mx-auto h-16">Code Hike</nav>
      </div>
      <div className="max-w-7xl mx-auto flex">
        <aside className="w-64 sticky top-16 self-start flex-shrink-0 hidden 2cols:block">
          <Sidebar />
        </aside>
        <article className="min-w-0 flex-1">
          <main className="mx-auto px-8 pt-4" style={{ width: "80ch" }}>
            <Content />
            <Content />
            <Content />
          </main>
        </article>
        <aside className="w-64 top-16 flex-shrink-0 hidden 3cols:block"></aside>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <ul className="p-4">
      {section.map((item) => (
        <li key={item}>
          <a href="" className="block w-full select-none px-1 py-2">
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Content() {
  const className = "leading-relaxed mt-6";
  return (
    <div>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
      <p className={className}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
        urna eu aliquam gravida, nisi nisi fermentum nunc, eu consectetur nunc
        ante eu nisi. Nulla facilisi. Nulla facilisi.
      </p>
    </div>
  );
}
