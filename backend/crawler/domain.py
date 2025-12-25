from urllib.parse import urlparse
import tldextract


def get_domain_name(url):
    try:
        ext = tldextract.extract(url)
        if ext.domain and ext.suffix:
            return f"{ext.domain}.{ext.suffix}"
        return ""
    except Exception:
        return ""


def get_sub_domain_name(url):
    try:
        return urlparse(url).netloc
    except Exception:
        return ""
