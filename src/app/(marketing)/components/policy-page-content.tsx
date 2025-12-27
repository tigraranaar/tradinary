import Link from "next/link";
import PageTitle from "./page-title";
import { PolicyData, PolicyContentItem } from "@/types/policy";

interface PolicyPageContentProps {
  data: PolicyData;
}

function renderContentItem(item: PolicyContentItem, index: number) {
  switch (item.type) {
    case "paragraph":
      return (
        <p key={index} className="leading-relaxed">
          {item.text}
        </p>
      );
    case "list":
      return (
        <ul key={index} className="ml-4 list-inside list-disc space-y-2">
          {item.items.map((listItem, idx) => (
            <li key={idx}>{listItem}</li>
          ))}
        </ul>
      );
    case "paragraph-with-link":
      return (
        <p key={index} className="leading-relaxed">
          {item.text}{" "}
          <Link href={item.linkHref} className="text-white hover:underline">
            {item.linkText}
          </Link>
          {item.textAfter ? ` ${item.textAfter}` : ""}
        </p>
      );
  }
}

export default function PolicyPageContent({ data }: PolicyPageContentProps) {
  return (
    <main className="min-h-screen px-4 md:px-16 lg:px-24">
      <div className="mx-auto max-w-4xl py-20">
        <div>
          <PageTitle title={data.title} subtitle={data.subtitle} />

          <div className="glass space-y-8 rounded-lg p-8 text-gray-300 md:p-12">
            {/* Introduction */}
            <section>
              <p className="leading-relaxed">{data.introduction}</p>
            </section>

            {/* Sections */}
            {data.sections.map((section, sectionIndex) => (
              <section key={sectionIndex}>
                <h2 className="mb-4 text-2xl font-semibold text-white">
                  {section.number !== undefined ? `${section.number}. ` : ""}
                  {section.title}
                </h2>

                {section.subsections ? (
                  <>
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="mt-6 mb-3 text-xl font-medium text-white">
                          {subsection.title}
                        </h3>
                        <div className="space-y-4">
                          {subsection.content.map((item, itemIndex) =>
                            renderContentItem(item, itemIndex)
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                ) : section.content ? (
                  <div className="space-y-4">
                    {section.content.map((item, itemIndex) => renderContentItem(item, itemIndex))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
