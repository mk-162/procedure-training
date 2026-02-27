// Programme definitions for the training app
// Each programme is a sequence of modules covering related chapters

export interface Programme {
  slug: string;
  title: string;
  description: string;
  moduleIds: string[];
  estimatedMinutes: number;
}

export const PROGRAMMES: Programme[] = [
  {
    slug: "house-of-commons-procedure",
    title: "Procedure in the House of Commons",
    description:
      "This programme covers the core procedural knowledge you need to support Members in the Chamber. It takes you from the ordering of business through to the maintenance of order and the tabling of Questions. Based on chapters 17 to 22 of Erskine May.",
    moduleIds: [
      "naming-a-member",
      "maiden-speech",
      "unparliamentary-language",
      "order-of-business",
      "time-allocation",
      "questions-to-ministers",
    ],
    estimatedMinutes: 45,
  },
];

export function getProgrammeBySlug(slug: string): Programme | undefined {
  return PROGRAMMES.find((p) => p.slug === slug);
}
