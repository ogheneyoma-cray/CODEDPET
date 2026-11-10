"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
          Admin password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00C853] outline-none text-slate-900"
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[#00C853] text-slate-900 font-semibold px-6 py-3 rounded-full hover:bg-[#00b34a] disabled:opacity-60"
      >
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
