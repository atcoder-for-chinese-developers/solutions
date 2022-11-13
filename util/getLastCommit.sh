mkdir commitInfo
for f in src/*; do
    git log --format="{\"id\": \"%H\", \"short\": \"%h\", \"date\": \"%cI\"}" $f | head -1 > ${f/src\//commitInfo\/}.json
done
git log --format="{\"id\": \"%H\", \"short\": \"%h\", \"date\": \"%cI\"}" | head -1 > commitInfo/global.json
