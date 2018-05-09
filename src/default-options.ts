export interface IOption {
    noisyTags: string[];
    separators: string[];
    verbose: boolean;
}
export const defaultOptions: IOption = {
    noisyTags: [
        "able",
        "and",
        "async",
        "but",
        "can",
        "cannot",
        "did",
        "feature",
        "fixture",
        "given",
        "not",
        "only",
        "scenario"
,       "spec",
        "the",
        "then",
        "test",
        "with",
        "when",
        "(t)",
    ],
    separators: [".", ":", "!", ",", ";"],
    verbose: false,
};
