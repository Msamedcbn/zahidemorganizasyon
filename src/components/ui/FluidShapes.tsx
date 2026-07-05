export function FluidShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div
        className="fluid-shape w-[500px] h-[500px] bg-primary/20 -top-40 -left-40 animate-float"
      />
      <div
        className="fluid-shape w-[400px] h-[400px] bg-primary/15 top-1/3 -right-32 animate-float-reverse"
      />
      <div
        className="fluid-shape w-[300px] h-[300px] bg-primary/10 bottom-0 left-1/4 animate-float-delayed"
      />
    </div>
  );
}
