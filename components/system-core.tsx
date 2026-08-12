import type { CSSProperties } from "react";

export function SystemCore() {
  return (
    <div aria-hidden="true" className="system-core">
      <div className="system-core__frame">
        <span className="system-core__corner system-core__corner--one" />
        <span className="system-core__corner system-core__corner--two" />
        <span className="system-core__corner system-core__corner--three" />
        <span className="system-core__corner system-core__corner--four" />
        <div className="system-core__halo system-core__halo--one" />
        <div className="system-core__halo system-core__halo--two" />
        <div className="system-core__orbit system-core__orbit--outer">
          <span className="system-core__runner" />
        </div>
        <div className="system-core__orbit system-core__orbit--middle" />
        <div className="system-core__orbit system-core__orbit--inner" />
        <div className="system-core__ticks">
          {Array.from({ length: 36 }, (_, index) => (
            <span
              className="system-core__tick"
              key={index}
              style={{ "--tick-index": index } as CSSProperties}
            />
          ))}
        </div>
        <div className="system-core__segments">
          {Array.from({ length: 12 }, (_, index) => (
            <span
              className="system-core__segment"
              key={index}
              style={{ "--segment-index": index } as CSSProperties}
            />
          ))}
        </div>
        <div className="system-core__sphere">
          <span className="system-core__latitude system-core__latitude--one" />
          <span className="system-core__latitude system-core__latitude--two" />
          <span className="system-core__latitude system-core__latitude--three" />
          <span className="system-core__longitude system-core__longitude--one" />
          <span className="system-core__longitude system-core__longitude--two" />
          <span className="system-core__pulse" />
          <span className="system-core__iris" />
        </div>
        <span className="system-core__node system-core__node--one" />
        <span className="system-core__node system-core__node--two" />
        <span className="system-core__node system-core__node--three" />
        <span className="system-core__node system-core__node--four" />
        <span className="system-core__readout system-core__readout--one" />
        <span className="system-core__readout system-core__readout--two" />
        <span className="system-core__scan" />
      </div>
    </div>
  );
}
