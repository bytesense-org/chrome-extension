import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { categories, VideoScores } from "@root/src/shared/constants/constants";
import { CategoryPreference } from "@root/src/shared/storages/categoryPreferenceStorage";

refreshOnUpdate("pages/content/injected/calcOptimumQuality");

export async function calcOptimumQuality(
  videoScores: VideoScores,
  categoryPreference: CategoryPreference
) {
  console.log(`Calculating optimum video quality`);

  const optimumCategoryId = await selectOptimumCategory(videoScores);

  const optimumQuality = await selectOptimumQuality(
    optimumCategoryId,
    videoScores,
    categoryPreference
  );
  return { optimumCategoryId, optimumQuality };
}

async function selectOptimumCategory(
  videoScores: VideoScores
): Promise<string> {
  let confidentCategoryId = "defaultQuality";

  if (!videoScores) {
    console.log(`Video scores not found, returning '${confidentCategoryId}'`);
    return confidentCategoryId;
  }

  const { textScores } = videoScores;

  console.log(`Video scores found`);
  console.log(videoScores);

  const textScoresKeys = textScores ? Object.keys(textScores) : [];
  console.log(`Calculating category confidence`);

  const categoryConfidence: [string, number][] = Object.entries(categories).map(
    ([key, obj]) => {
      let confidenceScore = 0;
      // if (channelCategoryId === key) {
      //   console.log(
      //     `Channel category hit, category: ${key}, channel category: ${channelCategoryId}`
      //   );

      //   confidenceScore++;
      // }

      // why this condition???
      if (textScoresKeys.includes(key)) {
        if (textScores[key] >= obj.selectionConditions.textThreshold) {
          console.log(
            `Keyword threshold condition hit, category: ${key}, keyword score: ${textScores[key]}, threshold: ${obj.selectionConditions.textThreshold}`
          );
          // check if keyword occurences meet threshold
          confidenceScore++;
        }

        // quick hack to use the yt categorization
        if (textScores[key] >= 1000) {
          console.log(`YT categorization condition hit, category: ${key}`);
          confidenceScore += 100;
        }
      }
      return [key, confidenceScore];
    }
  );

  // select category with highest confidence
  const confidentCategory = categoryConfidence.sort(
    (keyPair1, keyPair2) => keyPair2[1] - keyPair1[1]
  )[0];

  console.log(
    `Category with highest confidence, category: ${confidentCategory[0]}`
  );

  // ensure that default category is used if no confidence
  if (confidentCategory[1] > 0) {
    console.log(`Sufficient confidence detected`);
    // optimumQuality = preferences.categories[confidentCategory[0]];
    confidentCategoryId = confidentCategory[0];
  }

  console.log(`Optimum category is ${confidentCategoryId}`);
  return confidentCategoryId;
}

const selectOptimumQuality = async (
  optimumCategoryId: string,
  videoScores: VideoScores,
  categoryPreference: CategoryPreference
): Promise<string> => {
  console.log(`Running heuristics to get optimum quality`);

  const minimumQuality = categoryPreference[optimumCategoryId].min;
  const maximumQuality = categoryPreference[optimumCategoryId].max;

  console.log(
    `Checking preferred quality, min: ${minimumQuality}, max: ${maximumQuality}`
  );

  // default quality does not have a min/max, only a single value that is represented by max
  if (optimumCategoryId === "defaultQuality") {
    console.log(`Default quality chosen, quality: ${maximumQuality}`);
    return maximumQuality;
  }

  if (minimumQuality === maximumQuality) {
    console.log(`Min/Max is the same, quality: ${minimumQuality}`);
    return minimumQuality;
  }

  return maximumQuality;

  // const { diffScore } = videoScores.frameScores;
  // console.log(
  //   `Helpers/selectOptimumQuality: Using difference score to determine quality level, diffScore: ${diffScore}`
  // );

  // const minIndex = qualities.findIndex(
  //   (quality) => quality === parseInt(minimumQuality)
  // );
  // const maxIndex = qualities.findIndex(
  //   (quality) => quality === parseInt(maximumQuality)
  // );

  // const numLevels = maxIndex - minIndex + 1;
  // console.log(`Helpers/selectOptimumQuality: ${numLevels} quality steps found`);
  // const closestIndex = minIndex + Math.round(numLevels * diffScore);
  // console.log(
  //   `Helpers/selectOptimumQuality: Step ${Math.round(
  //     numLevels * diffScore
  //   )} chosen`
  // );
  // const chosenQuality = qualities[closestIndex].toString();

  // console.log(
  //   `Helpers/selectOptimumQuality: Quality chosen, quality: ${chosenQuality}`
  // );
  // return chosenQuality;
};
