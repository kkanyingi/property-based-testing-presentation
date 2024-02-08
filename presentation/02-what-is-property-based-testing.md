# What is property based testing?
- Property-based testing is a style of testing popularized by the QuickCheck Haskell library.

- It integrates generated test cases into existing testing workflows.

- Instead of tests that provide examples of a single concrete behavior, property-based tests 
specify properties that hold for a wide range of inputs.

- The testing library then attempts to generate test cases to refute these properties.

- If it finds a counterexample, it reports the input that caused the property to fail.

- Property-based testing is particularly useful for finding edge cases and corner cases that
are difficult to anticipate.

- Property-based testing is not a replacement for example-based testing, but rather a complement.
