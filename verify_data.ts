import { getData } from "./src/services/mongoService";

async function verify() {
  console.log("Fetching issues...");
  try {
    const issues = await getData();
    console.log(`Successfully fetched ${issues.length} issues.`);
    issues.forEach(i => {
      console.log(`- [${i.id}] ${i.title} (${i.status})`);
    });
  } catch (err) {
    console.error("Verification failed:", err);
  }
}

verify();
