import { LineIcon, Tag } from "./ui";

const matches = [
  { photo: "/photos/nora.jpg", name: "Nora V.", tag: "Priced SaaS for India", selected: true },
  { photo: "/photos/omar.jpg", name: "Omar H.", tag: "Entered GCC from India" },
  { photo: "/photos/meera.jpg", name: "Meera S.", tag: "Got first 100 customers" },
];

const days = [
  { d: "Mon", n: 12 },
  { d: "Tue", n: 13, active: true },
  { d: "Wed", n: 14 },
  { d: "Thu", n: 15 },
  { d: "Fri", n: 16 },
];

const slots = ["10:00", "11:30", "14:00", "16:30"];

export function BookingInfographic() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <Panel step={1} title="Share the challenge" caption="Describe the decision in front of you.">
        <div className="rounded-2xl bg-white p-3.5 ring-1 ring-line">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Your challenge</p>
          <p className="mt-2 text-sm font-semibold leading-snug text-ink">
            How should we price for the Indian market?
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Tag tint="peach">Pricing</Tag>
            <Tag tint="sky">India</Tag>
            <Tag tint="butter">B2B SaaS</Tag>
          </div>
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs font-medium text-muted">
          <LineIcon name="chat" className="h-3.5 w-3.5" />
          Or book a discovery call
        </p>
      </Panel>

      <Panel step={2} title="Match relevant experience" caption="Vetted people who have been through it.">
        <ul className="space-y-2">
          {matches.map((m) => (
            <li
              key={m.name}
              className={`flex items-center gap-3 rounded-2xl bg-white p-2.5 ${
                m.selected ? "ring-[1.5px] ring-ink" : "ring-1 ring-line"
              }`}
            >
              <img src={m.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{m.name}</p>
                <p className="truncate text-xs text-muted">{m.tag}</p>
              </div>
              {m.selected && <Tag tint="lime">Fit</Tag>}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel step={3} title="Get practical advice" caption="Learn what worked, what didn’t, and why.">
        <div className="grid grid-cols-2 gap-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-[4/5]">
            <img src="/photos/ken.jpg" alt="" className="h-full w-full object-cover" />
            <span className="absolute bottom-2 left-2.5 text-[11px] font-medium text-white drop-shadow">You</span>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-[4/5]">
            <img src="/photos/nora.jpg" alt="" className="h-full w-full object-cover" />
            <span className="absolute bottom-2 left-2.5 text-[11px] font-medium text-white drop-shadow">Nora</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-full bg-white px-3.5 py-2 ring-1 ring-line">
          <span className="flex items-center gap-2 text-xs font-semibold text-leaf">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime ring-1 ring-leaf" />
            Live · 1:1
          </span>
          <span className="text-xs font-medium text-muted tabular-nums">12:48</span>
        </div>
        <div className="mt-2 hidden grid-cols-4 gap-1 sm:grid">
          {days.slice(0, 2).map((day) => (
            <div key={day.d} className="rounded-lg bg-white py-1 text-center ring-1 ring-line">
              <p className="text-[10px] text-muted">{day.d}</p>
              <p className="text-xs font-semibold tabular-nums">{day.n}</p>
            </div>
          ))}
          {slots.slice(0, 2).map((s) => (
            <div
              key={s}
              className={`rounded-lg py-1 text-center text-[10px] font-semibold tabular-nums ${
                s === "11:30" ? "bg-lime text-ink" : "bg-white text-ink ring-1 ring-line"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Panel({
  step,
  title,
  caption,
  children,
}: {
  step: number;
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-4 ring-1 ring-line">
      <div className="flex-1 rounded-2xl bg-mist p-4">{children}</div>
      <div className="mt-4 flex gap-3 px-1 pb-1">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white tabular-nums">
          {step}
        </span>
        <div>
          <p className="font-display text-lg font-bold">{title}</p>
          <p className="mt-0.5 text-sm text-muted">{caption}</p>
        </div>
      </div>
    </div>
  );
}
