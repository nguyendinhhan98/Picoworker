#!/bin/bash
ENV_EXAMPLE='.env.example'
ENV=".env"
n=1
rm -rf $ENV
while read line; do
enviroments=$(echo $line | tr "=" "\n")
INDEX=0
for i in $enviroments
do
    STR=""
    if [[ $INDEX -eq 0 ]]
    then
        oldEnv=$(echo $enviroments | grep -w $i | tr " " "\n" | sed -n '2p')
        envInSystem=$( env | grep -w STG_$i | tr "=" "\n" | sed -n '2p')
        if [[ -z "$envInSystem" ]]
        then
            echo "$i=$oldEnv" >> $ENV
        else
            echo "$i=$envInSystem" >> $ENV
        fi
    fi
    let INDEX=$INDEX+1
    
done
n=$((n+1))
done < $ENV_EXAMPLE

cat .env
