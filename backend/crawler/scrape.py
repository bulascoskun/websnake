from urllib.request import urlopen
from bs4 import BeautifulSoup


def scrape_pages(urls):
    results = []

    for url in urls:
        try:
            response = urlopen(url)
            soup = BeautifulSoup(response.read(), "html.parser")

            title = (
                soup.title.string.strip()
                if soup.title and soup.title.string
                else "No title"
            )

            meta = soup.find("meta", attrs={"name": "description"})
            description = meta.get("content", "") if meta else ""

            h1 = soup.find("h1")
            h1_text = h1.get_text(strip=True) if h1 else ""

            paragraphs = soup.find_all("p")
            body_text = " ".join(p.get_text(strip=True) for p in paragraphs)
            body_preview = body_text[:300]

            results.append(
                {
                    "url": url,
                    "title": title,
                    "description": description,
                    "h1": h1_text,
                    "body_preview": body_preview,
                }
            )

        except Exception as e:
            print(f"Scrape error ({url}):", e)

    return results
