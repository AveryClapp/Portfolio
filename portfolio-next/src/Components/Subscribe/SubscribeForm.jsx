"use client";
import { useState } from "react";

const SubscribeForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
        setMessage("Subscribed");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong");
    }
  };

  // Success state
  if (status === "success") {
    return (
      <div className="text-sm text-neutral-700">
        {message}
      </div>
    );
  }

  // Collapsed state - just a link
  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors underline-grow"
      >
        Subscribe for new posts →
      </button>
    );
  }

  // Expanded state - show form
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 items-start">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
            disabled={status === "loading"}
            autoFocus
            className="w-full px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-neutral-900 disabled:bg-neutral-100 disabled:cursor-not-allowed"
          />
          {status === "error" && (
            <p className="text-xs text-neutral-600 mt-1">{message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default SubscribeForm;
