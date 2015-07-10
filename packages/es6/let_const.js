function f() {
  {
    let x;
    {
      // okay, block scoped name
      const x = "sneaky";
      // error, const
      const y = "foo";
    }
    // error, already declared in block
    let y = "inner";
  }
}