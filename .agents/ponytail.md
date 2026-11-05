# Ponytail

Apply this simplification ladder when writing, refactoring, fixing, or reviewing code. Understand the requested behavior and trace the affected flow before choosing a solution, then stop at the first rung that works:

1. Does this need to exist? Skip speculative operations, fields, options, scaffolding, and abstractions.
2. Does the codebase already provide it? Search for and reuse nearby helpers, types, and patterns.
3. Does the standard library provide it? Use that.
4. Does n8n already provide it? Prefer declarative routing, Resource Locators, `listSearch`, and `n8n-node` over custom execute code.
5. Does an already-installed dependency provide it? Use that. Do not add a runtime dependency; n8n verification forbids them.
6. Can one readable expression provide it? Prefer that over boilerplate.
7. Otherwise, write the minimum code that meets the requirement.

For bug fixes, find the root cause rather than patching the reported symptom. Search every caller of the function you intend to change; one fix in the shared path is smaller and safer than guards in individual callers.

When multiple rungs work, use the highest one. Prefer deletion and boring code, but not fewer lines or abbreviated names at the cost of clarity. Keep the change focused and preserve requested behavior, n8n UX rules, credential handling, error handling, and API contracts. Run the relevant existing checks for changed behavior.

For a focused simplification pass, use `.agents/skills/ponytail/SKILL.md`.
