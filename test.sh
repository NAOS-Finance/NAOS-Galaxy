# /bin/bash
# usage sh test.sh -n [test times] -f [test file name]
max=10
dir=test
file=
while getopts n:f:d: flag
do
    case "${flag}" in
        n) max=${OPTARG};;
        d) dir=${OPTARG};;
        f) file=${OPTARG};;
    esac
done

filename=$dir/$file.test.ts

if [ ! -f "$filename" ]; then
    echo "test file $filename does not exist."
    exit 1;
fi

for (( i=1; i <= $max; ++i ))
do
    npx hardhat test $filename
done