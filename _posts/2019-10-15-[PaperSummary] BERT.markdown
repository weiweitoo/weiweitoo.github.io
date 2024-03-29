# [Paper Summary] BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding
**Title**
BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding

**Submission Date**
24 May 2019

## Key Contributions
1. Introduce a new fine-tuning approach, BERT(Bidirectional Encoder Representations from Transformers)
2. Argued that major limitations of the previous standard language models are unidirectional, which limits the choice of architectures that can be used for pre-training
3. Introduce a “masked language model” (MLM) which randomly mask some of the token from input, with objective predict original vocabulary id of masked word based on its context
4. Use a “next sentence prediction” task that jointly pre-trains text-pair representations, which allow to pre-trained deep bidirectional transformer

## Achievements
1. BERT advances the state of the art for eleven NLP tasks. The code and pre-trained models are available at https://github.com/google-research/bert

## Introduction
There are 2 ways of pre-training, which including feature-based and fine-tuning based. Both of the pre-training will pre-train a language model using unsupervised learning. 

And then, feature-based will construct an task-specific architecture which include the pre-training language modeling. In this case, it will freeze the parameter of language modeling, and supervised training dataset B(which is data for a specific task), and the convergence of parameter will happen on the other parameters.

Fine-tuning introduces minimal task-specific parameters, and is trained on the down-stream tasks by simply fine-tuning the pre-trained parameter. Explaination in here is about using BERT as fine-tuning approach. Feature-based approach can find in original paper

### Annotations
```
L = Number of Layers(Transformer Block)
A = Number of Self Attention

BERTBASE (L=12, H=768, A=12, Total Parameters=110M) 
BERTLARGE (L=24, H=1024, A=16, Total Parameters=340M).

Former = “Transformer encoder”
Left-context-only transformer = Transformer decoder, since it can be used for text generation.
```

## Data
WordPiece embeddings (Wu et al. 2016) with a 30,000 token vocabulary. 
1. The first token of every sequence is always a special classification token ([CLS]). 
2. The final hidden state corresponding to this token is used as the aggregate sequence representation for classification tasks.
3. Sentence pairs are packed together into a single sequence. We differentiate the sentences in two ways. 
   1. First, we separate them with a special token ([SEP]). 
   2. Second, we add a learned embedding to every token indicating whether it belongs to sentence A or sentence B.

![BERT input embeddings][bert_input_embeddings]

### Pre-training data afterwards
The pre-training procedure largely follows the existing literature on language model pre-training. For the pre-training corpus we use the BooksCorpus (800M words) (Zhu et al., 2015) and English Wikipedia (2,500M words).

## Approach
There are two steps in BERT: pre-training and fine-tuning. 

**Pre-training**
Model is trained on unlabeled data over different pre-training tasks. 

**Fine-tuning**
BERT model is first initialized with the pre-trained parameters, and all of the parameters are fine-tuned using labeled data from the downstream tasks. 

**Masked Language Model**
In order to train a deep bidirectional representation, we simply mask some percentage of the input tokens at random, and then predict those masked tokens. 15% of token has been masked. MLM allows bidirectional pre-training, a downside is there are mismatch between pre-training and fine-tuning, since the [MASK] token does not appear during fine-tuning. In order to tackle this, out of 15%(previously mentioned), it will be 
- 80% is the masked token 
- 10% became a random token
- 10% replace back the original token


## Example Use Case: Next Sentence Prediction (NSP)
Many important downstream tasks such as Question Answering (QA) and Natural Language Inference (NLI) are based on understanding the relationship between two sentences, which is not directly captured by language modeling. In order to train a model that understands sentence relationships, author pre-train for a binarized next sentence prediction task that can be trivially generated from any monolingual corpus.

|                                                        GPT                                                       |                                                  BERT                                                 |
|:----------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------:|
| GPT is trained on the BooksCorpus (800M words)                                                                   | BERT is trained on the BookCorpus (800M words) and Wikipedia (2,500 M words)                          |
| GPT uses a sentence seperator ([SEP]) and classifier token ([CLS]) which are only introduced at fine-tuning time | BERT learns [SEP], [CLS] and sentence A/B embeddings during pre-training                              |
| GPT was trained on 1M steps with a batch size of 32,000 words                                                    | BERT was trained on 1M steps with a batch size of 128,000 words                                       |
| GPT used the same learning rate of 5e-5 for all fine-tuning experiments                                          | BERT chooses a task-specific fine-tuning learning rate which performs the best on the development set |

TODO: add wordpiece embedding


## Experiments
1. MLM does converge marginally slower than a left-to-right model (which predicts every token), but the empirical improvements of the MLM model far outweigh the increased training cost.
2. BERTBASE and BERTLARGE differs in network architecture size. BERTBASE and OpenAI GPT are nearly identical in model architecture outside of the attention masking.
3. BERTBASE and BERTLARGE outperform all existing systems on GLUE tasks by a substantial margin, obtaining 4.4% and 6.7% respective average accuracy improvement over the state-of-the-art
4. BERTLARGE significantly outperforms BERTBASE across all tasks, even those with very little training data
5. BERT outperforms the top leaderboard system of SQuAD by +1.5 F1 in ensembling and +1.3 F1 as a single system
6. BERT outperformed Named Entity Recognition Base model. It also outperformed in SWAG (Situations With Adversarial Generations) by 27.1% from authors baseline.

# Reference
[1] https://arxiv.org/abs/1810.04805
[2] https://swethatanamala.github.io/2018/12/24/summary-of-bert-paper/
[3] https://zhuanlan.zhihu.com/p/49271699

[example_1_table]: http://www.hitoo.co/assets/images/post/summary_bert_pretraining_of_deep_bidirectional_transformers_for_language_understanding/bert-input-embedding.png "BERT Input Embddings"
