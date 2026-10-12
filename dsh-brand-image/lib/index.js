/**
 * dsh-brand-image — Host half.
 *
 * This plugin contributes browser presentation only: the actual work happens in
 * the client half (./client.js), which registers a custom image into the
 * `sidebar.brand.mark` slot. The host half is an empty Loader seat so the
 * bundle composes like every other row in the profile tree.
 *
 * `inject` is deliberately absent: nothing on the Host side is required.
 */

/** Empty apply. Accepts the Cordis context and registers nothing. */
export function apply() {}
