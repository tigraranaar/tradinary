export type PolicyContentItem =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "paragraph-with-link";
      text: string;
      linkText: string;
      linkHref: string;
      textAfter?: string;
    };

export interface PolicySubsection {
  title: string;
  content: PolicyContentItem[];
}

export interface PolicySection {
  title: string;
  number?: number;
  subsections?: PolicySubsection[];
  content?: PolicyContentItem[];
}

export interface PolicyData {
  title: string;
  subtitle: string;
  introduction: string;
  sections: PolicySection[];
}
