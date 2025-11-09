"use client";
import { useState } from "react";

const SubscribeForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Subscribed! Check your email to confirm.");
        setEmail("");
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
          setMessage("");
        }, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Simple text button */}
      <div className="border-b border-neutral-200 pb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors underline-grow"
        >
          Get notified about new posts
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-stone-100 rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {status === "success" ? (
              <div>
                <p className="text-sm text-neutral-700">✓ {message}</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-display font-semibold mb-4">
                  Subscribe to new posts
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                    disabled={status === "loading"}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                  />
                  {status === "error" && (
                    <p className="text-xs text-red-600">{message}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-200 rounded hover:bg-neutral-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded hover:bg-neutral-800 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? "..." : "Subscribe"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SubscribeForm;
