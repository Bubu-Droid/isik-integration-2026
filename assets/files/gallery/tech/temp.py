import os
import re
import subprocess

pattern = r"([a-zA-Z]+_[0-9]+).([JPGjpg]+)"

for i in os.listdir():
    if re.match(pattern, i):

        finalname = re.sub(
            pattern,
            lambda mo: f"{mo.group(1)}.{'webp'}",
            i,
        )

        print(finalname)
        # subprocess.run(["ffmpeg", "-i", i, finalname])
