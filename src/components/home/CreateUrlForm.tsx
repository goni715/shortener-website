"use client";

import type React from "react";
import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useCreateShortUrlMutation } from "@/redux/features/url/urlApi";
import { ErrorToast } from "@/helpers/ValidationHelper";
import { DOMAIN_URL } from "@/constant/global.constant";

const CreateUrlForm = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [createUrl, { isLoading }] = useCreateShortUrlMutation();

  const handleShortenUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl) return;
    try {
      const res = await createUrl({
        originalUrl,
      }).unwrap();

      const shortUrl = res?.data?.shortUrl;
      setShortUrl(shortUrl);
    } catch {
      ErrorToast("Something Went Wrong");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setOriginalUrl("");
    setShortUrl("");
    setCopied(false);
  };

  return (
    <>
      <form onSubmit={handleShortenUrl} className="space-y-6">
        {/* Long URL Input */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <span className="text-lg">🔗</span>
            Long URL
          </label>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/very-long-url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            disabled={shortUrl !== ""}
          />
        </div>

        {/* Short URL Output */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <span className="text-lg">✂️</span>
            Shortened URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              placeholder="Your shortened link will appear here"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none"
            />
            {shortUrl && (
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-medium"
                title="Copy to clipboard"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">💡 Domain: {DOMAIN_URL}</p>
        </div>

        {/* Action Buttons */}
        {shortUrl && (
          <div className="flex flex-col md:flex-row gap-3">
            <button
              type="button"
              onClick={() => window.open(shortUrl, "_blank")}
              className="flex-1 px-4 py-3 bg-teal-600 cursor-pointer text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <ExternalLink size={16} />
              Visit URL
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 px-4 py-3 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Shorten Another Link
            </button>
          </div>
        )}

        {!shortUrl && (
          <button
            type="submit"
            disabled={!originalUrl || isLoading}
            className="w-full px-4 py-3 bg-teal-600 cursor-pointer text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-sm"
          >
            {isLoading ? "Shortening..." : "Shorten URL"}
          </button>
        )}
      </form>
    </>
  );
};

export default CreateUrlForm;
