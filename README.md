# prev
Github Action to clean old Github Actions runs

## Usage

```yaml

name: 'Clean old runs example'
on:
  push:
    branches:
      - master

permissions: write-all # required to delete old jobs

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: matyifkbt/prev@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```