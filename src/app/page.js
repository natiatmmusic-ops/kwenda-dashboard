<div className="grid grid-cols-2 gap-3">
          {upcoming.map((p) => (
            <div key={p.id} className="hairline pt-3 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono text-fog uppercase">{p.category}</div>
                <div className="text-[14px] font-medium">{p.title}</div>
                <div className="text-[11px] text-ash mt-0.5">
                  {p.owner} · due {p.dueDate}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <StatusBadge status={p.status} styles={statusStyles} />
                <PriorityBadge priority={p.priority} styles={priorityStyles} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
