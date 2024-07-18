import Papa from "papaparse";
import Fuse from "fuse.js";
import csv from "./templates.csv?url";

export default () => ({
  searchQuery: "",
  snippets: [],
  fuse: null,
  init() {
    // Load and parse the CSV file
    fetch(csv)
      .then((response) => response.text())
      .then((csvText) => {
        const result = Papa.parse(csvText, { header: true });
        this.snippets = result.data.map((row) => ({
          category: row.category,
          type: row.type,
          subject: row.subject,
          body: row.body,
        }));
        this.fuse = new Fuse(this.snippets, {
          keys: ["body"],
          includeScore: true,
          threshold: 0.4,
        });
      });
  },
  get filteredSnippets() {
    return this.searchQuery
      ? this.fuse.search(this.searchQuery).map((result) => result.item)
      : this.snippets || [];
  },
  copyToClipboard(snippet) {
    navigator.clipboard.writeText(snippet).then(() => {
      alert("Snippet copied to clipboard!");
    });
  },
});
