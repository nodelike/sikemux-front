# Repository Instructions

Resolve this project with `agentctl context --format env` before context-sensitive work.
- Scope: personal
- Git provider: github
- Issue tracker: github
- VPN: tailscale profile=personal mode=on-demand

## Git workflow

- Work directly on the `main` branch.
- Do not create or use Git worktrees.
- Commit changes directly to `main`.
- Make small, atomic commits as work progresses.
- Other agents are always working in the same tree at the same time. Stage only the
  files your own session touched, by path, and commit those. Never `git add -A`,
  `git add .`, or `git commit -a`, and never stash, revert, or amend anything you
  did not write. Unrelated dirty files belong to someone else — leave them alone
  and do not mention them as blockers.

## Code

- Do not proactively write comments in code. We prefer code to be self explanatory. When we write comments its because there is something locally unintuitive that a future reader should know. But as we write code our goal is to make all code locally intuitive, removing the need for comments. If we ever do need to write comments, we never introduce jargon. Comments should be understandable to someone who was just dropped into the codebase for the first time. Comments should attempt to be concise, on average 1-2 lines. If you are writing a longer comment its likely there is a lot of useless information, which is bad because the information may become stale as the code changes
- Do not leave random markdown files in the codebase that are meant to be some way to deliver information to me. If you want to write a markdown file write it in a temporary file, and give me the path and chat and I can read it
- Never write code that is explicitly backwards compatible. Systems should handle backwards compatibility (like migrations), not logic. If there is some logic that needs to be written otherwise it would appear it would break older users, you MUST make the assumption that no users have ran that code yet and its unreleased, so it would not make sense to consider the side effects that code would produce. This is a safe assumption because the maintainers of this codebase always ensure code that gets shipped is compatbile with the systems that allow for us to not have to explicitly hardcode backwards compatibility

## Site

- This is the marketing site for [Sikemux](https://github.com/nodelike/sikemux), built with Astro and deployed on Vercel.
- The look follows the app's `DESIGN.md`: the accent means selected, focused, or the one primary action; hairlines, not shadows; sans for what the site says, mono for what the machine says.
- Copy must be true of the shipped app. Check claims against the app's README before writing them.
- Run `pnpm build` before committing; it type-checks and builds.
- `public/og.png` is the share card. After changing the hero or the headline, run `pnpm og` to regenerate it from `src/pages/og.astro`.
