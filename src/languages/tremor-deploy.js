// Copyright 2020, The Tremor Team
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/*
Language: tremor-deploy
Author: Darach Ennis <darach@gmail.com>
Description: Tremor is an event processing system with embedded domain languages. Tremor-deploy is the deployment language DSL. Tremor-deply embeds tremor-query.
Website: https://www.tremor.rs
*/

function defineTroyGrammar(hljs) {
  const BRACED_SUBST = {
    className: 'subst',
    contains: [
      {subLanguage: 'troy',}
    ],
    begin: '#\\{',
    end: '}'
  };

  const KEYWORDS = {
    keyword:
      'connector pipeline flow config links connect to deploy ' +
      'emit drop const let for match of case when default end patch insert update erase move copy present absent ' +
      'merge fn use mod recur with as intrinsic select create define operator script from into with group by window ' +
      'stream tumbling sliding where having set each',
    meta:
          // context-sensitive keywords
      'event args state window group and or not' +
      ' binary integer unsigned signed big little',
    literal:
      'false true null'
  };

  const STRING = {
    className: 'string',
    variants: [
      {
        begin: '"""',
        end: '"""',
        contains: [hljs.BACKSLASH_ESCAPE, BRACED_SUBST]
      },
      {
        begin: '"',
        end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE, BRACED_SUBST]
      },
    ]
  };
  BRACED_SUBST.contains = [
    hljs.C_NUMBER_MODE, STRING
  ];

  var PRIMED_IDENT = {
    className: 'string',
    begin: '`', end: '`',
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  var DOLLAR_IDENT = {
    className: 'meta',
    begin: '\\$[a-zA-Z0-9][a-zA-Z0-9_]*'
  };

  var SIGNIFICANT_OPERATORS = {
    className: 'built_in',
    begin: "(=>)|(~=)|~"
  };

  return {
    name: "tremor-deploy",
    aliases: ["troy"],
    keywords: KEYWORDS,
    case_insensitive: true,
    contains: [
      SIGNIFICANT_OPERATORS,
      STRING,
      PRIMED_IDENT,
      DOLLAR_IDENT,
      hljs.C_NUMBER_MODE,
      hljs.COMMENT(
        '#+',
        '$', {
          contains: [{
            begin: '.',
            subLanguage: 'markdown',
            end: '$',
            relevance:0
          }]
        }
      ),
    ]
  };
}

export default defineTroyGrammar;
